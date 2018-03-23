import words from 'an-array-of-english-words';

export const numberOfLetters = num => words.filter(w => w.length === num);

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

export const wordsWithLetters = (wordArr) => {
    const len = wordArr.length;
    const allWords = numberOfLetters(len - 1);
    return(
        noRepeat(allWords.filter(w => {
            for(var letter of w.split('')){
                if(wordArr.indexOf(letter) === -1){
                    return false
                };
            }
            return true;
        })))
}

export const findScore = (word) => {
    const scores = {
        a:1,
        b:4,
        c:8,
        d:1,
        e:1,
        f:3,
        g:2,
        h:2,
        i:1,
        j:7,
        k:2,
        l:1,
        m:2,
        n:1,
        o:2,
        p:4,
        q:1,
        r:1,
        s:1,
        t:1,
        u:4,
        v:3,
        w:4,
        x:8,
        y:7,
        z:10
    }
    let score = 0;
    for(const letter of word.split('')){
        score += scores[letter]
    }
    return score;
}

export const randomLetters = (num) => {
    const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    let ret = [];
    for(let i=0;i<num;i++){
        ret.push(letters[Math.floor(Math.random() * 26)]);
    }
    return ret;
}

export const getWordsLetters = (num) => {
    let letters;
    let words;
    let len = 2;
    while(len < 3){
        letters = randomLetters(num);
        words = wordsWithLetters(letters);
        len = words.length;
    }
    return([letters, words])
}
