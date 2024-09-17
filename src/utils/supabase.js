import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);


// Function to get data from the 'gen_survey' table
export async function getGenSurveyData() {
  try {
    const { data, error } = await supabase
      .from('entries')
      .select('*');

    if (error) {
      console.error('Error fetching data:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error:', error);
    return null;
  }
}

// Function to insert records into the 'gen_survey' table
export async function addGenSurveyData(records) {
  try {
    const { data, error } = await supabase
      .from('entries')
      .insert(records);

    if (error) {
      console.error('Error inserting data:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error:', error);
    return null;
  }
}

// // Function to insert records into the 'factor_survey' table
// export async function addFactorSurveyData(records) {
//   try {
//     const { data, error } = await supabase
//       .from('factor_survey')
//       .insert(records);

//     if (error) {
//       console.error('Error inserting data:', error);
//       return null;
//     }

//     return data;
//   } catch (error) {
//     console.error('Unexpected error:', error);
//     return null;
//   }
// }