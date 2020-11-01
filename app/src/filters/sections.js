export default function sections(value){
    const result = value[1].reduce((acc, n) => ((acc[n.sections] = acc[n.sections] || []).push(n), acc), {});
    return  Object.keys(result).filter(key =>  key !== '(puste)');
}