export default function sections(value){
    const result = value[1].reduce((acc, n) => ((acc[n.sections] = acc[n.sections] || []).push(n), acc), {});
    console.log(result)
    return Object.keys(result).map(key => key);
}