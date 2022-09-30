use std::collections::HashMap;

pub fn median(list: &mut Vec<i64>) -> i64{
    list.sort();

    let array_size = list.len();
    let is_odd = array_size % 2 == 0;

    if is_odd {
        return list[(array_size+1)/2];
    } else {
        return  (list [array_size/2] + list[(array_size/2)+1]) / 2;
    }
}

pub fn mode (list: &Vec<i64>) -> i64 {
    let mut values_count = HashMap::with_capacity(list.len());
    let mut max_count = 0;
    let mut  max_value = list.first().unwrap().clone();
    for value in list {
        let count = values_count.entry(value).or_insert(0);
        *count += 1;
        if count > &mut max_count {
            max_value = value.clone();
            max_count = count.clone()
        }
    }

    return  max_value.clone();
}

pub fn demo (mut list: Vec<i64>) {
    let median = median(&mut list);
    let mode = mode(&list);

    println!("\nThe values passed are {:?}", &list);

    println!("The median of the list of values passed is {}", median);
    println!("The mode of the list of values passed is {}", mode);
}