import { readonly, reactive } from 'vue';

const _syncState = reactive({
  active: false,
  type: "",
  currentStep: 0,
  totalSteps: 0,
  currentLabel: "",
  percent: 0,
  rowsFetched: 0,
  steps: [],
  error: null,
  startedAt: 0
});
function useSyncProgress() {
  function startSync(type, steps) {
    _syncState.active = true;
    _syncState.type = type;
    _syncState.currentStep = 0;
    _syncState.totalSteps = steps.length;
    _syncState.currentLabel = steps[0]?.label || "";
    _syncState.percent = 0;
    _syncState.rowsFetched = 0;
    _syncState.error = null;
    _syncState.startedAt = Date.now();
    _syncState.steps = steps.map((s, i) => ({
      label: s.label,
      index: i,
      total: steps.length,
      status: i === 0 ? "running" : "pending"
    }));
  }
  function updateStep(index, updates) {
    if (_syncState.steps[index]) {
      Object.assign(_syncState.steps[index], updates);
    }
    _syncState.currentStep = index;
    _syncState.currentLabel = _syncState.steps[index]?.label || "";
    _syncState.percent = Math.round((index + (updates.status === "done" ? 1 : 0.5)) / _syncState.totalSteps * 100);
    if (updates.rowsFetched) {
      _syncState.rowsFetched += updates.rowsFetched;
    }
  }
  function completeStep(index, rowsFetched) {
    const step = _syncState.steps[index];
    if (step) {
      step.status = "done";
      if (rowsFetched) step.rowsFetched = rowsFetched;
    }
    if (rowsFetched) _syncState.rowsFetched += rowsFetched;
    const nextIdx = index + 1;
    const nextStep = _syncState.steps[nextIdx];
    if (nextIdx < _syncState.totalSteps && nextStep) {
      nextStep.status = "running";
      _syncState.currentStep = nextIdx;
      _syncState.currentLabel = nextStep.label || "";
    }
    _syncState.percent = Math.round((index + 1) / _syncState.totalSteps * 100);
  }
  function finishSync() {
    _syncState.percent = 100;
    setTimeout(() => {
      _syncState.active = false;
    }, 3e3);
  }
  function failSync(error) {
    _syncState.error = error;
    setTimeout(() => {
      _syncState.active = false;
      _syncState.error = null;
    }, 5e3);
  }
  async function runHealthCheck() {
    const result = await $fetch(
      "/api/bigquery/sync-furniture?partition=list",
      { method: "POST" }
    );
    return result;
  }
  async function runSmartSync() {
    startSync("Smart Sync", [{ label: "Checking partitions..." }]);
    updateStep(0, { status: "running" });
    try {
      const health = await runHealthCheck();
      const needsSync = health.partitions.filter((p) => p.needsSync);
      if (needsSync.length === 0) {
        _syncState.currentLabel = "All partitions already in sync!";
        completeStep(0);
        finishSync();
        return { synced: 0, skipped: health.partitions.length, health };
      }
      const steps = needsSync.map((p) => ({ label: `${p.sheet} (${p.status === "behind" ? `+${p.diff}` : p.diff})` }));
      startSync("Smart Sync", steps);
      let totalSynced = 0;
      for (let i = 0; i < needsSync.length; i++) {
        const p = needsSync[i];
        updateStep(i, { status: "running" });
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 5 * 60 * 1e3);
          const mode = p.status === "behind" ? "delta" : "full";
          const result = await $fetch(
            `/api/bigquery/sync-furniture?partition=${p.index}&mode=${mode}&images=false`,
            { method: "POST", signal: controller.signal }
          );
          clearTimeout(timeout);
          completeStep(i, result.count || 0);
          totalSynced += result.count || 0;
        } catch (err) {
          const step = _syncState.steps[i];
          if (step) {
            step.status = "error";
            step.message = err?.data?.statusMessage || err.message || "Failed";
          }
          completeStep(i, 0);
        }
      }
      finishSync();
      return {
        synced: totalSynced,
        skipped: health.partitions.length - needsSync.length,
        processed: needsSync.length,
        health
      };
    } catch (err) {
      failSync(err?.data?.statusMessage || err.message || "Smart sync failed");
      throw err;
    }
  }
  async function runFullSync(options) {
    try {
      const listRes = await $fetch(
        "/api/bigquery/sync-furniture?partition=list",
        { method: "POST" }
      );
      if (!listRes.success || !listRes.partitions?.length) {
        throw new Error("Could not fetch partition list");
      }
      const partitions = listRes.partitions;
      startSync("Full Sync", partitions.map((p) => ({ label: p.sheet })));
      const syncImages = options?.images === true;
      for (let i = 0; i < partitions.length; i++) {
        const p = partitions[i];
        updateStep(i, { status: "running" });
        try {
          const imgParam = syncImages ? "&images=true" : "&images=false";
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 5 * 60 * 1e3);
          const result = await $fetch(
            `/api/bigquery/sync-furniture?partition=${p.index}&mode=full${imgParam}`,
            { method: "POST", signal: controller.signal }
          );
          clearTimeout(timeout);
          completeStep(i, result.count || 0);
        } catch (err) {
          const step = _syncState.steps[i];
          if (step) {
            step.status = "error";
            step.message = err?.data?.statusMessage || err.message || "Failed";
          }
          completeStep(i, 0);
        }
      }
      finishSync();
    } catch (err) {
      failSync(err?.data?.statusMessage || err.message || "Full sync failed");
      throw err;
    }
  }
  async function runFurnitureSync(options) {
    return runSmartSync();
  }
  async function runDeduplication() {
    startSync("Deduplication", [{ label: "Removing duplicates..." }]);
    updateStep(0, { status: "running" });
    try {
      const result = await $fetch("/api/bigquery/deduplicate-furniture", { method: "POST" });
      completeStep(0, result.removed || 0);
      finishSync();
      return result;
    } catch (err) {
      failSync(err?.data?.statusMessage || err.message || "Deduplication failed");
      throw err;
    }
  }
  async function runImageSync(options) {
    startSync("Image Sync", [{ label: "Syncing images to cloud storage..." }]);
    updateStep(0, { status: "running" });
    try {
      let totalCopied = 0;
      let offset = 0;
      const batchSize = 20;
      let remaining = 1;
      while (remaining > 0) {
        const params = { batch: batchSize, offset };
        if (options?.partition) params.partition = options.partition;
        const result = await $fetch("/api/bigquery/sync-furniture-images", {
          method: "POST",
          params
        });
        totalCopied += result.imagesCopied;
        remaining = result.remaining;
        const percentDone = result.totalNeedingImages > 0 ? Math.round((result.totalNeedingImages - remaining) / result.totalNeedingImages * 100) : 100;
        _syncState.percent = percentDone;
        _syncState.rowsFetched = totalCopied;
        _syncState.currentLabel = `${totalCopied} images synced... (${remaining} rows remaining)`;
        if (result.nextOffset !== null) {
          offset = result.nextOffset;
        } else {
          break;
        }
      }
      completeStep(0, totalCopied);
      finishSync();
      return { totalCopied };
    } catch (err) {
      failSync(err?.data?.statusMessage || err.message || "Image sync failed");
      throw err;
    }
  }
  async function runLevelsSync() {
    startSync("Levels", [
      { label: "Level 1" },
      { label: "Level 2" },
      { label: "Level 3" }
    ]);
    updateStep(0, { status: "running" });
    try {
      const result = await $fetch("/api/bigquery/sync-levels", { method: "POST" });
      if (result.success && result.details) {
        const tables = Object.entries(result.details);
        tables.forEach(([_, data], i) => {
          completeStep(Math.min(i, 2), data.total || 0);
        });
      }
      finishSync();
    } catch (err) {
      failSync(err?.data?.message || err.message || "Levels sync failed");
    }
  }
  async function runUsersSync() {
    startSync("Users", [{ label: "Users" }]);
    updateStep(0, { status: "running" });
    try {
      await $fetch("/api/bigquery/sync-users", { method: "POST" });
      completeStep(0);
      finishSync();
    } catch (err) {
      failSync(err?.data?.message || err.message || "Users sync failed");
    }
  }
  return {
    syncState: readonly(_syncState),
    startSync,
    updateStep,
    completeStep,
    finishSync,
    failSync,
    runHealthCheck,
    runSmartSync,
    runFullSync,
    runFurnitureSync,
    runLevelsSync,
    runUsersSync,
    runDeduplication,
    runImageSync
  };
}

export { useSyncProgress as u };
//# sourceMappingURL=useSyncProgress-DTUElile.mjs.map
