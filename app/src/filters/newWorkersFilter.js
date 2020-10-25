export default function newWorkersFilter(value) {
    if(value.final_salary != 0 && value.final_per_hour != 0) return `${value.name} - ${value.salary}`
}