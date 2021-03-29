export function setValueByPath(obj, value, path) {

    if (Array.isArray(value) && Array.isArray(path)) {
        value.forEach((value, index) => {
            let i;
            let newPath = path[index].split('.',);
            let newObj
            for (i = 0; i < newPath.length - 1; i++) {
                newObj = obj[newPath[i]];
            }
            newObj[newPath[i]] = value
        })
    }

}

