/**
 * Global Sync Progress Store
 *
 * Tracks the progress of data sync operations (furniture, levels, users)
 * and exposes reactive state for the header progress bar.
 */

interface SyncStep {
    label: string
    index: number
    total: number
    status: 'pending' | 'running' | 'done' | 'error'
    rowsFetched?: number
    message?: string
}

interface SyncState {
    active: boolean
    type: string // 'furniture' | 'levels' | 'users' | etc.
    currentStep: number
    totalSteps: number
    currentLabel: string
    percent: number
    rowsFetched: number
    steps: SyncStep[]
    error: string | null
    startedAt: number
}

const _syncState = reactive<SyncState>({
    active: false,
    type: '',
    currentStep: 0,
    totalSteps: 0,
    currentLabel: '',
    percent: 0,
    rowsFetched: 0,
    steps: [],
    error: null,
    startedAt: 0,
})

export function useSyncProgress() {
    /**
     * Start a new sync operation
     */
    function startSync(type: string, steps: { label: string }[]) {
        _syncState.active = true
        _syncState.type = type
        _syncState.currentStep = 0
        _syncState.totalSteps = steps.length
        _syncState.currentLabel = steps[0]?.label || ''
        _syncState.percent = 0
        _syncState.rowsFetched = 0
        _syncState.error = null
        _syncState.startedAt = Date.now()
        _syncState.steps = steps.map((s, i) => ({
            label: s.label,
            index: i,
            total: steps.length,
            status: i === 0 ? 'running' : 'pending',
        }))
    }

    /**
     * Update progress for current step
     */
    function updateStep(index: number, updates: Partial<SyncStep>) {
        if (_syncState.steps[index]) {
            Object.assign(_syncState.steps[index], updates)
        }
        _syncState.currentStep = index
        _syncState.currentLabel = _syncState.steps[index]?.label || ''
        _syncState.percent = Math.round(((index + (updates.status === 'done' ? 1 : 0.5)) / _syncState.totalSteps) * 100)

        if (updates.rowsFetched) {
            _syncState.rowsFetched += updates.rowsFetched
        }
    }

    /**
     * Mark a step as complete and move to the next
     */
    function completeStep(index: number, rowsFetched?: number) {
        const step = _syncState.steps[index]
        if (step) {
            step.status = 'done'
            if (rowsFetched) step.rowsFetched = rowsFetched
        }
        if (rowsFetched) _syncState.rowsFetched += rowsFetched

        const nextIdx = index + 1
        const nextStep = _syncState.steps[nextIdx]
        if (nextIdx < _syncState.totalSteps && nextStep) {
            nextStep.status = 'running'
            _syncState.currentStep = nextIdx
            _syncState.currentLabel = nextStep.label || ''
        }
        _syncState.percent = Math.round(((index + 1) / _syncState.totalSteps) * 100)
    }

    /**
     * Mark the sync as fully done
     */
    function finishSync() {
        _syncState.percent = 100
        // Auto-hide after a brief delay
        setTimeout(() => {
            _syncState.active = false
        }, 3000)
    }

    /**
     * Mark the sync as errored
     */
    function failSync(error: string) {
        _syncState.error = error
        // Keep visible for 5s
        setTimeout(() => {
            _syncState.active = false
            _syncState.error = null
        }, 5000)
    }

    /**
     * Run a full furniture sync with progress tracking
     */
    async function runFurnitureSync(options?: { images?: boolean }) {
        try {
            // Step 1: Get partition list
            const listRes = await $fetch<{ success: boolean, partitions: { index: number, sheet: string }[], total: number }>('/api/bigquery/sync-furniture?partition=list', { method: 'POST' })

            if (!listRes.success || !listRes.partitions?.length) {
                throw new Error('Could not fetch partition list')
            }

            const partitions = listRes.partitions
            startSync('Furniture', partitions.map(p => ({ label: p.sheet })))

            // Step 2: Sync each partition sequentially
            for (let i = 0; i < partitions.length; i++) {
                const p = partitions[i]!
                updateStep(i, { status: 'running' })

                try {
                    const imgParam = options?.images === false ? '&images=false' : ''
                    const result = await $fetch<{ success: boolean, count: number, sheet: string }>(`/api/bigquery/sync-furniture?partition=${p.index}${imgParam}`, { method: 'POST' })
                    completeStep(i, result.count || 0)
                }
                catch (err: any) {
                    const failedStep = _syncState.steps[i]
                    if (failedStep) {
                        failedStep.status = 'error'
                        failedStep.message = err?.data?.message || err.message || 'Failed'
                    }
                    // Continue with remaining partitions
                    completeStep(i, 0)
                }
            }

            finishSync()
        }
        catch (err: any) {
            failSync(err?.data?.message || err.message || 'Sync failed')
        }
    }

    /**
     * Run levels sync with progress
     */
    async function runLevelsSync() {
        startSync('Levels', [
            { label: 'Level 1' },
            { label: 'Level 2' },
            { label: 'Level 3' },
        ])
        updateStep(0, { status: 'running' })

        try {
            const result = await $fetch<{ success: boolean, details: Record<string, { total: number }> }>('/api/bigquery/sync-levels', { method: 'POST' })

            if (result.success && result.details) {
                const tables = Object.entries(result.details)
                tables.forEach(([_, data], i) => {
                    completeStep(Math.min(i, 2), data.total || 0)
                })
            }
            finishSync()
        }
        catch (err: any) {
            failSync(err?.data?.message || err.message || 'Levels sync failed')
        }
    }

    /**
     * Run users sync with progress
     */
    async function runUsersSync() {
        startSync('Users', [{ label: 'Users' }])
        updateStep(0, { status: 'running' })

        try {
            const result = await $fetch<{ success: boolean }>('/api/bigquery/sync-users', { method: 'POST' })
            completeStep(0)
            finishSync()
        }
        catch (err: any) {
            failSync(err?.data?.message || err.message || 'Users sync failed')
        }
    }

    return {
        syncState: readonly(_syncState) as Readonly<SyncState>,
        startSync,
        updateStep,
        completeStep,
        finishSync,
        failSync,
        runFurnitureSync,
        runLevelsSync,
        runUsersSync,
    }
}
