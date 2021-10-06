type PrettierObjectProps = {
    key?: string;
    value: any;
}

export default function prettierObject(params: PrettierObjectProps) {
    if (params.key) {
        console.log(params.key, JSON.stringify(params.value, null, 4));
    } else {
        console.log(JSON.stringify(params.value, null, 4));
    }
}