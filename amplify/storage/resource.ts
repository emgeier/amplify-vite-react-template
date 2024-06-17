import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'amplifyTeamDrive',
    access: (allow) => ({
      'images/{entity_id}/*': [
        allow.guest.to(['read', 'write']),
        allow.entity('identity').to(['read', 'write', 'delete'])
      ],
    })
  });