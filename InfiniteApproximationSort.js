/**
 * @author afmika
 * An esoteric way of sorting a Set (a list with non repeating items)
 * Complexity O(N * 10^P) ~ O(N * exp(2.3P)) where P is the desired precision, N the size of the set
 * When a member of the set has N decimals, we define P > N otherwise the result will be false
 * (yep it explodes quickly to infinity)
 * Theoretically speaking, we literally need an infinite amount of precision because we have to traverse
 * all numbers on the real number line for this to work in the absolute sense
 * thus we get a time complexity that can't be represented as a big O
 * So let's just say, it's O(infinity) in time
 */

function MinAndMax (set) {
    let min = +Infinity, max = -Infinity;
    for (let a of set) {
        min = Math.min (min, a);
        max = Math.max (max, a);
    }
    return [min, max];
}

function defineFunctionUsing (set, transl_y) {
    const H = x => x < 0 ? 0 : 1; // Heaviside function
    return x => {
        let sum = 0;
        for (let x0 of set) 
            sum += H(x - x0) * (x0 + transl_y);
        return sum;
    };
}

function infiniteApproximationSort (set, precision = 100) {
    const [min, max] = MinAndMax (set);
    const transl_y = Math.abs(min) + max;

    // we have to make sure that this function is strictly positive
    // so that all negative numbers and 0 behaves in a predictable way
    const f = defineFunctionUsing (set, transl_y);

    const result = new Set ();
    // dx must be infinitely small
    // O(n * infinitely large number)
    let dx = 1 / precision;
    for (let x = (min - dx); x <= (max + dx); x += dx) {
        let dy = f(x + dx) - f(x);
        // spike in the derivative when x is a member of our set
        if (dy > 0) {
            // console.log(dy / dx);
            result.add (dy - transl_y);
        }
    }

    return result;
}


module.exports = infiniteApproximationSort;