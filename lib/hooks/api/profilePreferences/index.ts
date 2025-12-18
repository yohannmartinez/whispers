import {
  getProfilePreferences,
  updateProfilePreferences,
} from "../../../api/profilePreferences";
import { ProfilePreferences } from "../../../types/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Custom hook to get profile preferences of a profile
 */
export function useProfilePreferences(profileId?: string) {
  return useQuery({
    queryKey: ["profilePrefences", profileId],
    queryFn: () => getProfilePreferences(profileId!),
    enabled: !!profileId,
  });
}

/**
 * Custom hook to update profile preferences
 */
export function useUpdateProfilePreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<ProfilePreferences>) =>
      updateProfilePreferences(payload.profileId!, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["profilePrefences", data?.profileId], data);
    },
  });
}
