export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)

        if (!body.projectId) {
            throw createError({ statusCode: 400, statusMessage: 'Project ID is required' })
        }

        const escape = (v: string) => (v || '').replace(/'/g, "\\'")

        const sql = `
      UPDATE \`flutter-5e2fd.etg_database.Projects\`
      SET
        \`Customer name\` = '${escape(body.customerName)}',
        \`Customer Address\` = '${escape(body.customerAddress)}',
        \`Branch Name\` = '${escape(body.branchName)}',
        \`Project Folder\` = '${escape(body.projectFolder)}',
        \`Vendor Name\` = '${escape(body.vendorName)}',
        \`Project Type\` = '${escape(body.projectType)}',
        \`Job Status\` = '${escape(body.jobStatus)}',
        \`Project Status\` = '${escape(body.projectStatus)}',
        \`Project Manager\` = '${escape(body.projectManager)}',
        \`Project Manager VA\` = '${escape(body.projectManagerVA)}',
        \`Finance Manager\` = '${escape(body.financeManager)}',
        \`Finance Manager VA\` = '${escape(body.financeManagerVA)}',
        Engineer = '${escape(body.engineer)}',
        \`Permit Coordinator\` = '${escape(body.permitCoordinator)}',
        \`Sales Rep\` = '${escape(body.salesRep)}',
        \`Project Equipment\` = '${escape(body.projectEquipment)}',
        \`Panels Amount\` = '${escape(body.panelsAmount)}',
        KW = '${escape(body.kw)}',
        Watt = '${escape(body.watt)}',
        Utillity = '${escape(body.utility)}',
        \`Solar Equipment\` = '${escape(body.solarEquipment)}',
        \`Inverter Type\` = '${escape(body.inverterType)}',
        \`Batteries Qty\` = '${escape(body.batteriesQty)}',
        \`Project Price\` = '${escape(body.projectPrice)}',
        \`Contract Price\` = '${escape(body.contractPrice)}',
        \`Project Net Amount\` = '${escape(body.projectNetAmount)}',
        AHJ = '${escape(body.ahj)}',
        Jurisdiction = '${escape(body.jurisdiction)}',
        \`Customer ID\` = '${escape(body.customerId)}',
        \`Customer Email\` = '${escape(body.customerEmail)}',
        \`Customer Phone\` = '${escape(body.customerPhone)}',
        \`SSA Status\` = '${escape(body.ssaStatus)}',
        \`Solar Install Status\` = '${escape(body.solarInstallStatus)}',
        \`MPU Installed Status\` = '${escape(body.mpuInstalledStatus)}',
        \`Battery Installed Status\` = '${escape(body.batteryInstalledStatus)}',
        \`Completion Status\` = '${escape(body.completionStatus)}',
        \`Final Status\` = '${escape(body.finalStatus)}',
        \`PTO Status\` = '${escape(body.ptoStatus)}',
        \`Fire Approval Needed\` = '${escape(body.fireApprovalNeeded)}',
        \`Project Start\` = '${escape(body.projectStart)}',
        \`Project End\` = '${escape(body.projectEnd)}',
        \`Completion Date\` = '${escape(body.completionDate)}',
        \`Final Date\` = '${escape(body.finalDate)}',
        \`PM Approve Project\` = '${escape(body.pmApproveProject)}',
        \`Finance Ready\` = '${escape(body.financeReady)}',
        \`PTO Request\` = '${escape(body.ptoRequest)}',
        \`PTO Submitted\` = '${escape(body.ptoSubmitted)}',
        \`PTO Received\` = '${escape(body.ptoReceived)}'
      WHERE \`Project ID\` = '${escape(body.projectId)}'
    `

        await queryBigQuery(sql)
        return { success: true, message: 'Project updated successfully' }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Failed to update project: ${message}` })
    }
})
