mod temperature_converter;
mod fibonacci;
mod twelve_days_of_christmas;
mod median_and_mode;

pub fn run_demo() {
    println!("*** Now running Rust book challenges*** ");
    temperature_converter::run_demo();
    fibonacci::demo(9);
    twelve_days_of_christmas::play();
    median_and_mode::demo(vec![5, 5, 6, 23, 5, 9, 1, 9])
}