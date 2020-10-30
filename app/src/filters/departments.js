export default function departments(value) {
    const result = value.reduce((acc, n) => ((acc[n.department] = acc[n.department] || []).push(n), acc), {});
    // console.log(result)
    const result2 = value.reduce((result, n) => ((result[n.sections] = result[n.sections] || []).push(n), result), {});
    console.log(result2 )
    return Object.keys(result).map(key => key);
}
