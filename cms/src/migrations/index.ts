import * as migration_20260129_141608 from './20260129_141608';
import * as migration_20260129_144858 from './20260129_144858';
import * as migration_20260129_151010 from './20260129_151010';

export const migrations = [
  {
    up: migration_20260129_141608.up,
    down: migration_20260129_141608.down,
    name: '20260129_141608',
  },
  {
    up: migration_20260129_144858.up,
    down: migration_20260129_144858.down,
    name: '20260129_144858',
  },
  {
    up: migration_20260129_151010.up,
    down: migration_20260129_151010.down,
    name: '20260129_151010'
  },
];
