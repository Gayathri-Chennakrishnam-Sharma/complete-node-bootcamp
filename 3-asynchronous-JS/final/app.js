const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err,data) =>{
            if(err) reject('Could not find the file saarz');
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err =>{
            if(err) reject('Could not find the file');
            resolve('Successfully wrote to file');
        });

    });
};


//using async/await
const getDogPic = async () => {
try{
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`BREED: ${data}`);

    const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all = await Promise.all([res1Pro, res2Pro, res3Pro])
    const imgs = all.map(el => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-image.txt', imgs.join('\n'));
    console.log('Random dogs image saved');
 } catch (err) {
    console.log(err.message);

    throw err;
 };
 return '2:done,got it'
};

(async() => {
    try {
        console.log('1:getting doc pics');
        const x = await getDogPic();
        console.log(x);
    } catch (error) {
        console.log('aaargh error')
    }

})();

// console.log('1:getting doc pics');
// getDogPic().then(x => {
//     console.log(x);
// }).catch(err => console.log('aaargh error'));


//using promises
// readFilePro(`${__dirname}/dog.txt`)
// .then(data => {
//     console.log(`BREED: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
// })
// .then(res =>{
//     console.log(res.body.message);
//     return writeFilePro('dog-image.txt', res.body.message)
// })
// .then(() =>{
//     console.log('Random dog image saved');
// })
// .catch((err) =>{
//     console.log(err.message);
// });
