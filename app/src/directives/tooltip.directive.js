import M from 'materialize-css'
export default {
  bind(el, {value}, vnode){
    if(value.toUpperCase() === 'TAK' ){
         M.Tooltip.init(el, {html: 'NOWY PRACOWNIK - POTWIERDZONA KONTYNUACJA ZATRUDNIENIA'})
    }else if (value.toUpperCase() === 'NIE'){
         M.Tooltip.init(el, {html: 'NOWY PRACOWNIK - NIE POTWIERDZONA KONTYNUACJA ZATRUDNIENIA'})
    }else if (value === false){

    }
    else{
      M.Tooltip.init(el, {html: value})
    }
  },
  unbind(el){
    const tooltip = M.Tooltip.getInstance(el)
    if(tooltip && tooltip.destroy){
      tooltip.destroy()
    }
  }
}
