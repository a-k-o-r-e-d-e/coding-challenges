// Generate the nth Fibonacci number.

// computes the nth fibonacci number
pub fn nth_fibonacci(n : i64) -> i64 {
    // using the golden ratio fomula
    // Fn = {[(√5 + 1)/2] ^ n} / √5 

    let sqrt_of_5 = f64::sqrt(5.0);
    let phi = (1.0 + sqrt_of_5) / 2.0;

    return (phi.powf(n as f64) / sqrt_of_5).floor() as i64;
}

// computes the nth fibonacci number
pub fn fibonacci_seq(n : i64) {
    let mut fib_arr:Vec<i64> = vec![0, 1];
    if n == 0 {
        println!("0");
    } else if n == 1 {
        println!("0, 1");
    } else {
        for index in 2..n as usize{
            let nth_fib:i64 = fib_arr[index - 1] + fib_arr[index - 2];
            fib_arr.push(nth_fib);
        }
        println!("{:?}", fib_arr);
    }
}

pub fn demo (n : i64) {
    println!("\nRunning the fibonacci section");
    let nth_fibonacci = nth_fibonacci(n);

    println!("The {}th fibonacci number is {}", n, nth_fibonacci);
    println!("The {}th fibonacci sequence", n);
    fibonacci_seq(n);    
}