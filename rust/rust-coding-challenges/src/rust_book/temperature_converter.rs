// Write a rust program that converts temperatures between fahrenheit and celsius
pub fn run_demo() {
    println!("\nCelsius Conversion");
    let temp_in_celsius = 3.0;
    let temp_in_fahrenheit = celsius_to_fahrenheit(temp_in_celsius);
    println!(
        "{:.2} in Celcius is equal to {:.2} in Fahrenheit",
        temp_in_celsius, temp_in_fahrenheit
    );

    let temp_in_kelvin = celsius_to_kelvin(temp_in_celsius);
    println!(
        "{:.2} in Celcius is equal to {:.2} in Kelvin",
        temp_in_celsius, temp_in_kelvin
    );

    println!("\nFahrenheit Conversion");
    let temp_in_fahrenheit = 56.0;
    let temp_in_celsius = fahrenheit_to_celsius(temp_in_fahrenheit);
    println!(
        "{:.2} in Fahrenheit is equal to {:.2} in Celcius",
        temp_in_fahrenheit, temp_in_celsius
    );
    let temp_in_kelvin = fahrenheit_to_kelvin(temp_in_fahrenheit);
    println!(
        "{:.2} in Fahrenheit is equal to {:.2} in Kelvin",
        temp_in_fahrenheit, temp_in_kelvin
    );

    println!("\nKelvin Conversion");
    let temp_in_kelvin = 345.0;
    let temp_in_celsius = kelvin_to_celsius(temp_in_kelvin);
    println!(
        "{:.2} in Kelvin is equal to {:.2} in Celcius",
        temp_in_kelvin, temp_in_celsius
    );
    let temp_in_fahrenheit = kelvin_to_fahrenheit(temp_in_kelvin);
    println!(
        "{:.2} in Kelvin is equal to {:.2} in Fahrenheit",
        temp_in_kelvin, temp_in_fahrenheit
    );
}

pub fn celsius_to_fahrenheit(temp_in_celsius: f64) -> f64 {
        if temp_in_celsius < -273.15 {
        panic!("Temp can not be lower than absolute zero (-273.15 celsius")
    }

    (temp_in_celsius * (9.0 / 5.0)) + 32.0
}

pub fn celsius_to_kelvin(temp_in_celsius: f64) -> f64 {
    if temp_in_celsius < -273.15 {
        panic!("Temp can not be lower than absolute zero (-273.15 celsius")
    }

    temp_in_celsius + 273.15
}

pub fn fahrenheit_to_celsius(temp_in_fahrenheit: f64) -> f64 {
    if temp_in_fahrenheit < -459.67 {
        panic!("Temp can not be lower than absolute zero (-459.67 fahrenheit")
    }

    (temp_in_fahrenheit - 32.0) * (5.0 / 9.0)
}

pub fn fahrenheit_to_kelvin(temp_in_fahrenheit: f64) -> f64 {
    if temp_in_fahrenheit < -459.67 {
        panic!("Temp can not be lower than absolute zero (-459.67 fahrenheit")
    }

    ((temp_in_fahrenheit - 32.0) * (5.0 / 9.0)) + 273.15
}

pub fn kelvin_to_fahrenheit(temp_in_kelvin: f64) -> f64 {
    if temp_in_kelvin < 0.0 {
        panic!("Temp can not be lower than absolute zero (0 kelvin")
    }

    ((temp_in_kelvin - 273.15) * (9.0 / 5.0)) + 32.0
}

pub fn kelvin_to_celsius(temp_in_kelvin: f64) -> f64 {
    if temp_in_kelvin < 0.0 {
        panic!("Temp can not be lower than absolute zero (0 kelvin")
    }

    temp_in_kelvin - 273.15
}
