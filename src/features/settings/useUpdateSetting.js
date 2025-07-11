import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";


export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isPending: isUpdateing } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Settings succsessfully updated');
      queryClient.invalidateQueries({
        queryKey: ['settings']
      });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  return { updateSetting, isUpdateing };
}