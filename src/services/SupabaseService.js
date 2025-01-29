// src/services/SupabaseService.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchProductImages() {
  try {
      // Query the productTable to get image paths
      const { data, error } = await supabase
          .from('productTable')
          .select('id, name, imagePath, Tags');

      if (error) {
          throw new Error(`Error fetching data: ${error.message}`);
      }

      if (!data) {
          console.log('No products found.');
          return [];
      }

      // Log and return image paths
      console.log('Fetched products:', data);
      return data.map(product => ({
          id: product.id,
          name: product.name,
          imagePath: product.imagePath,
          Tags: product.Tags
      }));
  } catch (err) {
      console.error('Error:', err);
      return [];
  }
}




export { fetchProductImages };
export default supabase;