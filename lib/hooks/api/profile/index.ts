import { getProfile, updateProfile } from "../../../api/profile";
import { Profile } from "../../../types/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Custom hook to get profile
 */
export function useProfile(profileId?: string) {
  return useQuery({
    queryKey: ["profile", profileId],
    enabled: !!profileId,
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return getProfile(id as string);
    },
  });
}

/**
 * Custom hook to update profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<Profile>) =>
      updateProfile(payload.id!, payload),
    onSuccess: (data) => {
      if (!data?.id) return;

      queryClient.setQueryData(["profile", data.id], data);
      queryClient.invalidateQueries({
        queryKey: ["profile", data.id],
      });
    },
  });
}
