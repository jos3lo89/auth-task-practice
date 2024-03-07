import taskModel from "../models/taskModel.js";

export const createTask = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;

    const newTask = new taskModel({
      titulo,
      descripcion,
      user: req.user.id,
    });

    const taskSaved = await newTask.save();

    res.status(201).json(taskSaved);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensaje: [error.message] });
  }
};

export const foundTask = async (req, res) => {
  try {
    const { id } = req.params;

    const rows =
      id !== undefined
        ? await taskModel.findById(id)
        : await taskModel.find({ user: req.user.id });

    res.status(200).json(rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensaje: [error.message] });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ mensaje: ["id requerido"] });

    await taskModel.findByIdAndDelete(id);

    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensaje: [error.message] });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ mensaje: ["id requerido"] });

    const { titulo, descripcion } = req.body;

    await taskModel.findByIdAndUpdate(id, {
      titulo: titulo,
      descripcion: descripcion,
    });

    const taskFound = await taskModel.findById(id);

    res.status(200).json(taskFound);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensaje: [error.message] });
  }
};
