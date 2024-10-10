import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to insert records into a table
export async function addData(records, table) {
	try {
		const { data, error } = await supabase.from(table).insert(records);

		if (error) {
			console.error("Error inserting data:", error);
			return null;
		}

		return data;
	} catch (error) {
		console.error("Unexpected error:", error);
		return null;
	}
}

export async function summarizeGenShare() {
	let { data, error } = await supabase.rpc("summarize_gen_share");
	if (error) console.error(error);
	else return data;
}


// Function to call the delete_entry SQL function in Supabase
export async function deleteEntry(user_id, artist_id) {
	try {
	  const { data, error } = await supabase
		.rpc('delete_entry', {
		  user_id_input: user_id,    // Pass the user_id to the function
		  artist_id_input: artist_id // Pass the artist_id to the function
		});
  
	  if (error) {
		console.error('Error calling delete_entry function:', error);
		return null;
	  }
  
	  console.log('Entry deleted successfully:', data);
	  return data;
	} catch (error) {
	  console.error('Unexpected error calling delete_entry:', error);
	  return null;
	}
  }
