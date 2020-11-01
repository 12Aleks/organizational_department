export default function department(value) {
    console.log(value)
    // const result = value.reduce((acc, n) => ((acc[n.sections] = acc[n.sections] || []).push(n), acc), {});
    return value[0]
}