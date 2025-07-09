import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase
    .from('cabins')
    .select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Date.now().toString(36) + Math.random().toString(36).substring(2)}-${newCabin.image.name}`
    .replace('/', '');
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  // 1. Crate or edit the cabin
  let query = supabase.from('cabins');

  // A) CREATE
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // B) EDIT
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be created');
  }

  // 2. Upload the image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id);
    console.log(storageError);
    throw new Error("Cabin image could not be upladed and the cabin was not created");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be deleted');
  }
}