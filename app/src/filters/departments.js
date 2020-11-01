export default function departments(value) {
    const result = value.reduce((acc, n) => ((acc[n.department] = acc[n.department] || []).push(n), acc), {});
    return Object.entries(result);
}
