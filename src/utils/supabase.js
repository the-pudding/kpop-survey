import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // Function to get data from the 'gen_survey' table
// export async function summarizeGenShare() {
// 	try {
// 		const { data, error } = await supabase.from("entries").select("*");

// 		if (error) {
// 			console.error("Error fetching data:", error);
// 			return null;
// 		}

// 		return data;
// 	} catch (error) {
// 		console.error("Unexpected error:", error);
// 		return null;
// 	}
// }

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
	else return data
}
