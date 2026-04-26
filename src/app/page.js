import { promises as fs } from 'fs';
import path from 'path';
import HomeClient from './HomeClient';

import { CodebookDBHelpers } from '@/lib/db';

export default async function HomePage() {
  const problems = await CodebookDBHelpers.getProblems();
  return <HomeClient problems={problems} />;
}

