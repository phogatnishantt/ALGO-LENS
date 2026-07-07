function normalize(s){

    return String(s)

        .replace(/\r/g,"")

        .split("\n")

        .map(x=>x.trimEnd())

        .join("\n")

        .trim();

}

function compare(expected,actual){

    const e=normalize(expected);

    const a=normalize(actual);

    return{

        passed:e===a,

        expected:e,

        actual:a

    };

}

module.exports={

    compare

};