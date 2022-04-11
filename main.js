const infiniteApproximationSort = require ('./InfiniteApproximationSort');

/**
 * @param {Set} sa 
 * @param {Set} sb 
 */
function epsilonCompare (sa, sb) {
    console.log('-------');
    const [a, b] = [sa, sb].map(s => new Array(...s));
    const min_size = Math.min(a.length, b.length);
    const eps = 10e-15;
    for (let i = 0; i < min_size; i++) {
        const diff = Math.abs(a[i] - b[i]);
        console.log(diff < eps ? '[ok]' : '[--]', 'index', i, ':', a[i], 'vs', b[i]);
    }
}

function main () {
    const precision = 100000;
    const test_set = new Set([0., 2, Math.PI, Math.E, 2.001, 10, 0.0487, -2]);

    // the bigger the precision, the longer it takes to compute
    const our_ans = infiniteApproximationSort (test_set, precision);
    console.log(our_ans, '(computed)');
    
    const built_in = new Set(
        new Array(...test_set).sort((a, b) => a - b)
    );
    console.log(built_in, '(built-in)');

    epsilonCompare (our_ans, built_in);
}

main ();