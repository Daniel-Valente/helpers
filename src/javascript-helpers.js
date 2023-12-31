/**
 * @description  This method is responsible for grouping all elements of an array according to a set parameter.
 * @param { Array } array Array of object with all elements.
 * @param { String } key Reference for create each group.
 * @returns { Object } return an array object with elements in groups.
 */
const groupBy = ( array, key ) => array.reduce(( x, y ) => {
    ( x[y[key]] = x[y[key]] || [] ).push( y );
    return x;
}, {});

/**
 * @description Condition on how to separate the text.
 * @param { String } string Text we want to separate.
 * @param { String } condition Condition about who separate the text. 
 * @returns { String[] | [] } Empty array or array of strings with separate text.
 */
const splitTextString = ( string, condition ) => {
    if ( string ) {
        const result = string.split( condition );
        return result;
    }
    return [];
};

/**
 * @description Look for a value in a specific array.
 * @param { String } value Search value.
 * @param { String } key Specific key to find the value in the array
 * @param { Array } firstArray First array to check the information.
 * @param { Array } secondArray Second array to check the information. 
 * @returns { Array } Return the array where the element exists.
 */
const searchObjectByAttributeInArray = ( value, key, firstArray, secondArray ) => {
    const item = firstArray.find( i => i[key] === value );

    if ( item ) return firstArray;
    return secondArray;
};

/**
 * @description Generates an array of numbers by specific elements.
 * @param { Number } start Initial number for the array.
 * @param { Number } stop End number for the array.
 * @param { Number } step Condition to follow to reach the final number
 * @returns { Number[] } Array of numbers.
 */
const arrayRange = ( start, stop, step ) =>
    Array.from({ length: ( stop - start ) / step + 1 }, ( _, index ) => start + index * step );

/**
 * @description 
 * @param { String } baseDate 
 * @param { String } format 
 * @returns { String } 
 */
const dateFormat = ( baseDate, format ) => {
    const date = new Date( baseDate );
    const map = {
        dd: date.getDate(),
        mm: date.getMonth() + 1,
        yyyy: date.getFullYear()
    };

    return format.replace(/dd||mm||yyyy/gi, matched => map[ matched ]);
}

/**
 * @description
 * @param { Array } array 
 * @param { Object } keysMapping 
 * @returns { Array }
 */
const applyKeyMAppingToArray = ( array, keysMapping ) => {
    const applyKeyMappingToObject = ( originalObject, keysMapping ) => {
        const newObject = {};

        for ( const originalKey in keysMapping ) {
            if ( keysMapping.hasOwnProperty( originalKey ) && originalObject.hasOwnProperty( originalKey )) {
                const newKey = keysMapping[ originalKey ];
                newObject[ newKey ] = originalObject[ originalKey ];
            }
        }
        return newObject;
    };

    const newArray = [];
    for ( const item of array ) {
        const newItem = applyKeyMappingToObject( item, keysMapping );
        newArray.push( newItem );
    }

    return newArray;
};

/**
 * @description
 * @param { Number } number 
 * @returns { String }
 */
const generateRandomString = ( number ) => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let result = "";
    let ch;
    while (result.length < number){
        ch = characters.charAt(Math.floor(Math.random() * charactersLength));
        if (!result.includes(ch)){
            result += ch;
        }
    }
    return result;
}
/**
 * @description Didivir en segmento una cadena de texto en base a un limite de caracteres deseados.
 * @param { string } text Cadena de texto que se desea dividir en segmentos de texto con un máximo de  caracteres.
 * @param { number } maximumLength Número máximo de caracteres deseado por segmento.
 * @returns { Array } Segmentos generados por la cadena de texto.
 */
const segmentString = ( text, maximumLength ) => {
    const segments = [];
    while (text.length > maximumLength) {
        let segment = text.substring(0, maximumLength);
        const lastSpace = segment.lastIndexOf(' ');

        if (lastSpace !== -1)
            segment = segment.substring(0, lastSpace);

        segments.push(segment.trim());
        text = text.substring(segment.length).trim();
    }
    segments.push(text.trim());
    return segments;
};