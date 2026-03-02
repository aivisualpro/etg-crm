<script setup lang="ts">
import { toast } from 'vue-sonner'

const props = defineProps<{
  open: boolean
  project?: any // null for create, filled for edit
  customerId?: string // pre-fill when adding from customer page
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  customerAddress?: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'saved': []
}>()

const isOpen = computed({
  get: () => props.open,
  set: (v: boolean) => emit('update:open', v),
})

const isEdit = computed(() => !!props.project)
const saving = ref(false)
const activeTab = ref<'project' | 'production'>('project')

// ─── Form fields ──────────────────────────────────────────
const form = ref({
  customerName: '',
  customerAddress: '',
  branchName: '',
  projectFolder: '',
  vendorName: '',
  projectType: 'Solar',
  jobStatus: 'In Progress',
  projectStatus: ['NEW JOB'] as string[],
  projectManager: '',
  projectManagerVA: '',
  financeManager: '',
  financeManagerVA: '',
  engineer: '',
  permitCoordinator: '',
  salesRep: '',
  projectEquipment: '',
  panelsAmount: '',
  kw: '',
  watt: '',
  utility: '',
  solarEquipment: '',
  inverterType: '',
  batteriesQty: '',
  projectPrice: '',
  contractPrice: '',
  projectNetAmount: '',
  ahj: '',
  jurisdiction: '',
  customerId: '',
  customerEmail: '',
  customerPhone: '',
  createBy: '',
  // Production Info fields
  ssaStatus: '',
  solarInstallStatus: '',
  mpuInstalledStatus: '',
  batteryInstalledStatus: '',
  completionStatus: '',
  finalStatus: '',
  ptoStatus: '',
  fireApprovalNeeded: '',
  projectStart: '',
  projectEnd: '',
  completionDate: '',
  finalDate: '',
  pmApproveProject: '',
  financeReady: '',
  ptoRequest: '',
  ptoSubmitted: '',
  ptoReceived: '',
})

// ─── Dropdowns ──────────────────────────────────────────
const users = ref<any[]>([])
const customers = ref<any[]>([])

async function loadOptions() {
  const [userData, custData] = await Promise.all([
    $fetch<{ success: boolean, users: any[] }>('/api/bigquery/users').catch(() => ({ success: false, users: [] })),
    $fetch<{ success: boolean, customers: any[] }>('/api/bigquery/customers').catch(() => ({ success: false, customers: [] })),
  ])
  if (userData.success) users.value = userData.users.filter((u: any) => u.Email && u.Status !== false)
  if (custData.success) customers.value = custData.customers
}

const userOptions = computed(() =>
  users.value.map((u: any) => ({
    value: u.Email,
    label: [u['First Name'], u['Last Name']].filter(Boolean).join(' ') || u.Email,
  })),
)

const customerOptions = computed(() =>
  customers.value.map((c: any) => ({
    value: c['Customer ID'],
    label: [c['First Name'], c['Last Name']].filter(Boolean).join(' ') || c['Customer ID'],
    email: c.Email || '',
    phone: c.Phone || '',
    address: c.Address || c['Customer Address'] || '',
  })),
)

const projectTypes = ['Solar', 'R&R', 'Home Improvement', 'REMOVAL', 'Battery', 'MPU']
const jobStatuses = ['In Progress', 'Closed', 'Cancelled', 'T/S', 'Pending Final Payment']
const projectStatuses = [
  'NEW JOB', 'Completed', 'NO APPROVAL', 'On Hold', 'Troubleshooting',
  'JOB CANCELED', 'Job Cancelled', 'Attention', 'Pending Final', 'Complete',
  'Job Canceled', 'No Approval',
]
const branches = ['SWS', 'RNVT', 'MOD', 'DSC', 'BSP']
const statusOptions = ['Pending', 'Approved', 'Rejected', 'Complete', 'N/A']
const fireApprovalOptions = ['Yes', 'No', 'TBD']

const showStatusDropdown = ref(false)
const sortedStatusOptions = ref<string[]>([])

function openStatusDropdown() {
  const selected = projectStatuses.filter(s => form.value.projectStatus.includes(s))
  const unselected = projectStatuses.filter(s => !form.value.projectStatus.includes(s))
  sortedStatusOptions.value = [...selected, ...unselected]
  showStatusDropdown.value = true
}

// Toggle a value in the projectStatus array
function toggleProjectStatus(status: string) {
  const idx = form.value.projectStatus.indexOf(status)
  if (idx >= 0) {
    form.value.projectStatus.splice(idx, 1)
  } else {
    form.value.projectStatus.push(status)
  }
}

// Compute dynamic branch options — include current value even if not in predefined list
const branchOptions = computed(() => {
  const current = form.value.branchName
  if (current && !branches.includes(current)) {
    return [current, ...branches]
  }
  return branches
})

// ─── Init form ──────────────────────────────────────────
watch(isOpen, (open) => {
  if (open) {
    activeTab.value = 'project'
    showStatusDropdown.value = false
    loadOptions()
    if (isEdit.value && props.project) {
      const p = props.project
      form.value = {
        customerName: p['Customer name'] || '',
        customerAddress: p['Customer Address'] || '',
        branchName: p['Branch Name'] || '',
        projectFolder: p['Project Folder'] || '',
        vendorName: p['Vendor Name'] || '',
        projectType: p['Project Type'] || 'Solar',
        jobStatus: p['Job Status'] || 'In Progress',
        projectStatus: (p['Project Status'] || '').split(',').map((s: string) => s.trim()).filter(Boolean),
        projectManager: p['Project Manager'] || '',
        projectManagerVA: p['Project Manager VA'] || '',
        financeManager: p['Finance Manager'] || '',
        financeManagerVA: p['Finance Manager VA'] || '',
        engineer: p.Engineer || '',
        permitCoordinator: p['Permit Coordinator'] || '',
        salesRep: p['Sales Rep'] || '',
        projectEquipment: p['Project Equipment'] || '',
        panelsAmount: p['Panels Amount'] || '',
        kw: p.KW || '',
        watt: p.Watt || '',
        utility: p.Utillity || '',
        solarEquipment: p['Solar Equipment'] || '',
        inverterType: p['Inverter Type'] || '',
        batteriesQty: p['Batteries Qty'] || '',
        projectPrice: p['Project Price'] || '',
        contractPrice: p['Contract Price'] || '',
        projectNetAmount: p['Project Net Amount'] || '',
        ahj: p.AHJ || '',
        jurisdiction: p.Jurisdiction || '',
        customerId: p['Customer ID'] || '',
        customerEmail: p['Customer Email'] || '',
        customerPhone: p['Customer Phone'] || '',
        createBy: p['Create By'] || '',
        // Production Info
        ssaStatus: p['SSA Status'] || '',
        solarInstallStatus: p['Solar Install Status'] || '',
        mpuInstalledStatus: p['MPU Installed Status'] || '',
        batteryInstalledStatus: p['Battery Installed Status'] || '',
        completionStatus: p['Completion Status'] || '',
        finalStatus: p['Final Status'] || '',
        ptoStatus: p['PTO Status'] || '',
        fireApprovalNeeded: p['Fire Approval Needed'] || '',
        projectStart: p['Project Start'] || '',
        projectEnd: p['Project End'] || '',
        completionDate: p['Completion Date'] || '',
        finalDate: p['Final Date'] || '',
        pmApproveProject: p['PM Approve Project'] || '',
        financeReady: p['Finance Ready'] || '',
        ptoRequest: p['PTO Request'] || '',
        ptoSubmitted: p['PTO Submitted'] || '',
        ptoReceived: p['PTO Received'] || '',
      }
    }
    else {
      // Reset for create
      form.value = {
        customerName: props.customerName || '',
        customerAddress: props.customerAddress || '',
        branchName: 'SWS',
        projectFolder: '',
        vendorName: '',
        projectType: 'Solar',
        jobStatus: 'In Progress',
        projectStatus: ['NEW JOB'],
        projectManager: '',
        projectManagerVA: '',
        financeManager: '',
        financeManagerVA: '',
        engineer: '',
        permitCoordinator: '',
        salesRep: '',
        projectEquipment: '',
        panelsAmount: '',
        kw: '',
        watt: '',
        utility: '',
        solarEquipment: '',
        inverterType: '',
        batteriesQty: '',
        projectPrice: '',
        contractPrice: '',
        projectNetAmount: '',
        ahj: '',
        jurisdiction: '',
        customerId: props.customerId || '',
        customerEmail: props.customerEmail || '',
        customerPhone: props.customerPhone || '',
        createBy: '',
        ssaStatus: '',
        solarInstallStatus: '',
        mpuInstalledStatus: '',
        batteryInstalledStatus: '',
        completionStatus: '',
        finalStatus: '',
        ptoStatus: '',
        fireApprovalNeeded: '',
        projectStart: '',
        projectEnd: '',
        completionDate: '',
        finalDate: '',
        pmApproveProject: '',
        financeReady: '',
        ptoRequest: '',
        ptoSubmitted: '',
        ptoReceived: '',
      }
    }
  }
})

function onCustomerChange(custId: string) {
  const cust = customerOptions.value.find(c => c.value === custId)
  if (cust) {
    form.value.customerEmail = cust.email
    form.value.customerPhone = cust.phone
    form.value.customerAddress = cust.address
    form.value.customerName = cust.label
  }
}

// ─── Save ──────────────────────────────────────────────
async function save() {
  saving.value = true
  try {
    const payload = {
      ...form.value,
      projectStatus: form.value.projectStatus.join(', '),
    }
    if (isEdit.value) {
      await $fetch('/api/bigquery/projects', {
        method: 'PUT',
        body: { ...payload, projectId: props.project['Project ID'] },
      })
      toast.success('Project updated!')
    }
    else {
      await $fetch('/api/bigquery/projects', {
        method: 'POST',
        body: payload,
      })
      toast.success('Project created!')
    }
    isOpen.value = false
    emit('saved')
  }
  catch (e: any) {
    toast.error(e.data?.statusMessage || 'Failed to save project')
  }
  finally {
    saving.value = false
  }
}

// ─── Form sections ─────────────────────────────────────
interface FormField {
  key: string
  label: string
  type: string
  options?: string[]
}

const projectInfoSections: { title: string, icon: string, fields: FormField[] }[] = [
  {
    title: 'General',
    icon: 'i-lucide-folder-kanban',
    fields: [
      { key: 'projectType', label: 'Project Type', type: 'select', options: projectTypes },
      { key: 'branchName', label: 'Branch', type: 'branch' },
      { key: 'jobStatus', label: 'Job Status', type: 'select', options: jobStatuses },
      { key: 'projectStatus', label: 'Project Status', type: 'multiselect', options: projectStatuses },
    ],
  },
  {
    title: 'Customer',
    icon: 'i-lucide-user',
    fields: [
      { key: 'customerId', label: 'Customer', type: 'customer' },
      { key: 'customerAddress', label: 'Address', type: 'text' },
    ],
  },
  {
    title: 'Team',
    icon: 'i-lucide-users',
    fields: [
      { key: 'projectManager', label: 'Project Manager', type: 'user' },
      { key: 'projectManagerVA', label: 'PM VA', type: 'user' },
      { key: 'financeManager', label: 'Finance Manager', type: 'user' },
      { key: 'financeManagerVA', label: 'Finance Manager VA', type: 'user' },
      { key: 'engineer', label: 'Engineer', type: 'user' },
      { key: 'permitCoordinator', label: 'Permit Coordinator', type: 'user' },
      { key: 'salesRep', label: 'Sales Rep', type: 'user' },
    ],
  },
  {
    title: 'Financial',
    icon: 'i-lucide-banknote',
    fields: [
      { key: 'projectPrice', label: 'Project Price', type: 'text' },
      { key: 'contractPrice', label: 'Contract Price', type: 'text' },
      { key: 'vendorName', label: 'Vendor', type: 'text' },
    ],
  },
  {
    title: 'Location & Permits',
    icon: 'i-lucide-map-pin',
    fields: [
      { key: 'ahj', label: 'AHJ', type: 'text' },
      { key: 'jurisdiction', label: 'Jurisdiction', type: 'text' },
      { key: 'fireApprovalNeeded', label: 'Fire Approval Needed', type: 'select', options: fireApprovalOptions },
    ],
  },
]

const productionInfoSections: { title: string, icon: string, fields: FormField[] }[] = [
  {
    title: 'Equipment',
    icon: 'i-lucide-cpu',
    fields: [
      { key: 'projectEquipment', label: 'Project Equipment', type: 'text' },
      { key: 'panelsAmount', label: 'Panels Amount', type: 'text' },
      { key: 'kw', label: 'KW', type: 'text' },
      { key: 'watt', label: 'Watt', type: 'text' },
      { key: 'utility', label: 'Utility', type: 'text' },
      { key: 'solarEquipment', label: 'Solar Equipment', type: 'text' },
      { key: 'inverterType', label: 'Inverter Type', type: 'text' },
      { key: 'batteriesQty', label: 'Batteries Qty', type: 'text' },
    ],
  },
  {
    title: 'Production Status',
    icon: 'i-lucide-activity',
    fields: [
      { key: 'ssaStatus', label: 'SSA Status', type: 'select', options: statusOptions },
      { key: 'solarInstallStatus', label: 'Solar Install Status', type: 'select', options: statusOptions },
      { key: 'mpuInstalledStatus', label: 'MPU Installed Status', type: 'select', options: statusOptions },
      { key: 'batteryInstalledStatus', label: 'Battery Installed Status', type: 'select', options: statusOptions },
      { key: 'completionStatus', label: 'Completion Status', type: 'select', options: statusOptions },
      { key: 'finalStatus', label: 'Final Status', type: 'select', options: statusOptions },
      { key: 'ptoStatus', label: 'PTO Status', type: 'select', options: statusOptions },
    ],
  },
  {
    title: 'Dates',
    icon: 'i-lucide-calendar',
    fields: [
      { key: 'projectStart', label: 'Project Start', type: 'date' },
      { key: 'projectEnd', label: 'Project End', type: 'date' },
      { key: 'completionDate', label: 'Completion Date', type: 'date' },
      { key: 'finalDate', label: 'Final Date', type: 'date' },
      { key: 'ptoRequest', label: 'PTO Request', type: 'date' },
      { key: 'ptoSubmitted', label: 'PTO Submitted', type: 'date' },
      { key: 'ptoReceived', label: 'PTO Received', type: 'date' },
    ],
  },
]

</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="max-w-3xl max-h-[85vh] flex flex-col p-0 gap-0">
      <!-- Header -->
      <div class="px-6 py-4 border-b flex items-center gap-3 shrink-0">
        <div class="size-10 rounded-xl flex items-center justify-center" :class="isEdit ? 'bg-blue-500/10' : 'bg-emerald-500/10'">
          <Icon :name="isEdit ? 'i-lucide-pencil' : 'i-lucide-plus'" class="size-5" :class="isEdit ? 'text-blue-500' : 'text-emerald-500'" />
        </div>
        <div>
          <DialogTitle class="text-lg font-semibold">
            {{ isEdit ? 'Edit Project' : 'New Project' }}
          </DialogTitle>
          <DialogDescription class="text-xs text-muted-foreground">
            {{ isEdit ? `Editing project ${project?.['Project ID']}` : 'Fill in the details to create a new project' }}
          </DialogDescription>
        </div>
      </div>

      <!-- Tabs -->
      <div class="px-6 pt-3 pb-0 border-b shrink-0">
        <div class="flex gap-1">
          <button
            class="px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-150 border-b-2"
            :class="activeTab === 'project'
              ? 'text-primary border-primary bg-primary/5'
              : 'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50'"
            @click="activeTab = 'project'"
          >
            <div class="flex items-center gap-1.5">
              <Icon name="i-lucide-folder-kanban" class="size-3.5" />
              Project Info
            </div>
          </button>
          <button
            class="px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-150 border-b-2"
            :class="activeTab === 'production'
              ? 'text-primary border-primary bg-primary/5'
              : 'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50'"
            @click="activeTab = 'production'"
          >
            <div class="flex items-center gap-1.5">
              <Icon name="i-lucide-activity" class="size-3.5" />
              Production Info
            </div>
          </button>
        </div>
      </div>

      <!-- Scrollable Form -->
      <div class="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        <template v-for="section in (activeTab === 'project' ? projectInfoSections : productionInfoSections)" :key="section.title">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <Icon :name="section.icon" class="size-4 text-muted-foreground" />
              <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{{ section.title }}</h3>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="field in section.fields" :key="field.key" :class="[field.key === 'customerAddress' || field.type === 'multiselect' ? 'col-span-2' : '']">
                <label class="text-[11px] font-medium text-muted-foreground block mb-1 ml-0.5">{{ field.label }}</label>

                <!-- Multi-select dropdown (Project Status) -->
                <div v-if="field.type === 'multiselect'" class="relative">
                  <button
                    type="button"
                    class="flex items-center gap-2 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    @click="showStatusDropdown ? showStatusDropdown = false : openStatusDropdown()"
                  >
                    <div class="flex-1 flex flex-wrap gap-1 min-h-[20px] items-center">
                      <template v-if="form.projectStatus.length > 0">
                        <span
                          v-for="s in form.projectStatus"
                          :key="s"
                          class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-medium leading-none"
                        >
                          {{ s }}
                          <button type="button" class="hover:text-red-500 transition-colors" @click.stop="toggleProjectStatus(s)">
                            <Icon name="i-lucide-x" class="size-2.5" />
                          </button>
                        </span>
                      </template>
                      <span v-else class="text-muted-foreground">Select statuses...</span>
                    </div>
                    <Icon name="i-lucide-chevron-down" class="size-3.5 text-muted-foreground shrink-0 transition-transform" :class="showStatusDropdown ? 'rotate-180' : ''" />
                  </button>
                  <!-- Dropdown panel -->
                  <div
                    v-if="showStatusDropdown"
                    class="absolute z-50 top-full left-0 right-0 mt-1 rounded-lg border bg-popover shadow-xl max-h-48 overflow-y-auto"
                  >
                    <button
                      v-for="opt in sortedStatusOptions"
                      :key="opt"
                      type="button"
                      class="flex items-center gap-2.5 w-full px-3 py-2 text-xs hover:bg-muted transition-colors text-left"
                      @click="toggleProjectStatus(opt)"
                    >
                      <div
                        class="size-4 rounded border flex items-center justify-center shrink-0 transition-colors"
                        :class="form.projectStatus.includes(opt)
                          ? 'bg-primary border-primary'
                          : 'border-input'"
                      >
                        <Icon v-if="form.projectStatus.includes(opt)" name="i-lucide-check" class="size-3 text-primary-foreground" />
                      </div>
                      {{ opt }}
                    </button>
                  </div>
                  <!-- Invisible backdrop to close -->
                  <div v-if="showStatusDropdown" class="fixed inset-0 z-40" @click="showStatusDropdown = false" />
                </div>

                <!-- Branch dropdown (dynamic options) -->
                <select
                  v-else-if="field.type === 'branch'"
                  v-model="(form as any)[field.key]"
                  class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Select...</option>
                  <option v-for="opt in branchOptions" :key="opt" :value="opt">{{ opt }}</option>
                </select>

                <!-- Select dropdown -->
                <select
                  v-else-if="field.type === 'select'"
                  v-model="(form as any)[field.key]"
                  class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Select...</option>
                  <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
                </select>

                <!-- User dropdown -->
                <select
                  v-else-if="field.type === 'user'"
                  v-model="(form as any)[field.key]"
                  class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">
                    Select...
                  </option>
                  <option v-for="u in userOptions" :key="u.value" :value="u.value">{{ u.label }}</option>
                </select>

                <!-- Customer dropdown -->
                <div v-else-if="field.type === 'customer'">
                  <select
                    v-model="(form as any)[field.key]"
                    class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    :disabled="!!customerId"
                    @change="onCustomerChange(($event.target as HTMLSelectElement).value)"
                  >
                    <option value="">
                      Select customer...
                    </option>
                    <option v-for="c in customerOptions" :key="c.value" :value="c.value">{{ c.label }}</option>
                  </select>
                </div>

                <!-- Date input -->
                <Input
                  v-else-if="field.type === 'date'"
                  v-model="(form as any)[field.key]"
                  type="date"
                  class="h-9"
                />

                <!-- Text input -->
                <Input
                  v-else
                  v-model="(form as any)[field.key]"
                  :placeholder="field.label"
                  class="h-9"
                />
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t flex items-center justify-end gap-2 shrink-0">
        <Button variant="outline" size="sm" :disabled="saving" @click="isOpen = false">
          Cancel
        </Button>
        <Button size="sm" :disabled="saving" @click="save">
          <Icon v-if="saving" name="i-lucide-loader-2" class="mr-1 size-3.5 animate-spin" />
          <Icon v-else :name="isEdit ? 'i-lucide-check' : 'i-lucide-plus'" class="mr-1 size-3.5" />
          {{ isEdit ? 'Update Project' : 'Create Project' }}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
