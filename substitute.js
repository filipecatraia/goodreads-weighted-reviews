/*
 * This file is responsible for performing the logic of replacing
 * all occurrences of each mapped word with its emoji counterpart.
 */

function appendWeightedRating() {
    document.getElementById('rating_details').click();

    const ratings = [];

    document
        .getElementById('rating_distribution')
        .querySelectorAll('tr > td:last-of-type')
        .forEach(node => {
            ratings
                .push(
                    Number(
                        node
                            .innerText
                            .split('(')[1]
                            .replace(')', '')
                    )
                )
        })

    console.log('ratings', ratings);
    document.querySelector('.tooltip .close').click();

    const ratingCount = ratings.reduce((acc, item) => acc += item, 0);
    console.log('ratingCount', ratingCount);

    const weightedTotal = ratings.reduce((acc, item, index) => {
        const multiplier = index === 0 ? 0.85 : 1;
        console.log('looping… (acc, item, index, multiplier)', acc, item, index, multiplier);
        acc += item * (5 - index) * multiplier;
        return acc;
    }, 0);
    console.log('computes:', weightedTotal, weightedTotal / ratingCount);
    const weightedRating = (weightedTotal / ratingCount).toFixed(2);
    console.log('weightedRating', weightedRating);
    // 1450911*5+532805*4+153497*3+24217*2+9077*1 = 9.903.777

    document
        .querySelectorAll('[itemprop="ratingValue"]')
        .forEach(node => {
            const rating = node.innerText;
            node.innerText = rating + ` [ Weighted: ${weightedRating} ]`;
            console.log(rating);
        })
}

function once(fn, context) {
    var result;

    return function() {
        if(fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }

        return result;
    };
}

once(appendWeightedRating());