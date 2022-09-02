function fileDownload(X: number, B: number[], Z: number) : number{
    const r = X - B.reduce((a, b) => a+b);

    if (r >= X) {
        return 0;
    }
    let lastAvr;
    if (Z < B.length) {
        lastAvr = (B.slice(B.length-Z).reduce((a, b) => a+b))/Z;
    } else {
        lastAvr = r/Z;
    }

    
    const estimate = Math.ceil(r/lastAvr);    

    if (Number.isNaN(estimate)|| (Math.sign(estimate) === -0 || Math.sign(estimate) === -1)) {
        return -1;
    }

    return estimate;
}

console.log(fileDownload(100, [10, 6, 6, 8], 2)); // 10
console.log(fileDownload(100, [10, 6, 6, 8], 3)); // 10
console.log(fileDownload(100, [10, 6, 6, 8, 80], 1)); // 10