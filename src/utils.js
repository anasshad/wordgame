import words from 'an-array-of-english-words';

export const numberOfLetters = num => words.filter(w => w.length === num);

export const wordsWithLetters = (wordArr) => {
    const len = wordArr.length;
    const allWords = numberOfLetters(len - 1);
    return(
        allWords.filter(w => {
            for(var letter of w.split('')){
                if(wordArr.indexOf(letter) === -1){
                    return false
                };
            }
            return true;
        }))
}


export const noRepeat = (wordArr) => (
    wordArr.filter(word => {
        const arr = word.split('');
        for(var i=0;i<arr.length;i++){
            let j = i+1;
            if(arr.indexOf(arr[i], j) !== -1){
                return false;
            }
        }
        return true;
    })
)

console.log(noRepeat(wordsWithLetters(['a','l','i','e','n'])));

