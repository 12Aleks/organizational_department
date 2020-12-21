import M from 'materialize-css'

export default {
    bind(el, {value}) {
        if (value === 'TAK') {
            M.Tooltip.init(el, {html: 'NOWY PRACOWNIK - POTWIERDZONA KONTYNUACJA ZATRUDNIENIA'})
        } else if (value === 'NIE') {
            M.Tooltip.init(el, {html: 'NOWY PRACOWNIK - NIE POTWIERDZONA KONTYNUACJA ZATRUDNIENIA'})
        } else if (value === 'false') {
            M.Tooltip.init(el, {html: 'NOWY PRACOWNIK - NIE MA UZGODNIONEJ DECYZJI'})
        }
    },
    unbind(el) {
        const tooltip = M.Tooltip.getInstance(el)
        if (tooltip && tooltip.destroy) {
            tooltip.destroy()
        }
    }
}