import {
  addProfilePicture,
  deleteProfilePicture,
  getProfilePictures,
  setNewFavoriteProfilePicture,
} from "../../../api/profilePicture";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Custom hook to get profile picture for a given profile id
 */
export function useProfilePitcures(profileId?: string) {
  return useQuery({
    queryKey: ["profilePictures", profileId],
    enabled: !!profileId,
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return getProfilePictures(id as string);
    },
  });
}

/**
 * Custom hook to add a picture to a profile
 */
export function useAddProfilePictures() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      profileId: string;
      imageUrl: string;
      isPrimary: boolean;
    }) =>
      addProfilePicture(payload.profileId, payload.imageUrl, payload.isPrimary),
    onSuccess: (data) => {
      if (!data?.profileId) return;

      queryClient.invalidateQueries({
        queryKey: ["profilePictures", data.profileId],
      });
    },
  });
}

/**
 * Custom hook to delete picture from profile
 */
export function useDeleteProfilePicture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { pictureId: string; profileId: string }) =>
      deleteProfilePicture(payload.pictureId, payload.profileId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["profilePictures", variables.profileId],
      });
    },
  });
}

/**
 * Custom hook to set a new profile picture in primary
 */
export function useSetNewFavoriteProfilePicture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { profileId: string; pictureId: string }) =>
      setNewFavoriteProfilePicture(payload.pictureId, payload.profileId),

    onSuccess: (_data, { profileId }) => {
      queryClient.invalidateQueries({
        queryKey: ["profilePictures", profileId],
      });
    },
  });
}
