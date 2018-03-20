import words from 'an-array-of-english-words';

export const numberOfLetters = num => words.filter(w => w.length === num);

export const wordsWithLetters = () => {
    const len = arguments.length;
    const allWords = numberOfLetters(len - 1);
    return(
        allWords.filter(w => {
            for(var letter of Array.from(arguments)){
                if(w.split[''].indexOf(letter) === -1) return false;
            }
            return true;
        })
    )
}