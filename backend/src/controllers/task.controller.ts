export const getTasks = async (req: any, res) => {
  const { search, status, page = 1 } = req.query;
  const tasks = await prisma.task.findMany({
    where: {
      userId: req.user.userId,
      title: search ? { contains: search } : undefined,
      completed: status ? status === "true" : undefined,
    },
    take: 10,
    skip: (page - 1) * 10,
  });
  res.json(tasks);
};
