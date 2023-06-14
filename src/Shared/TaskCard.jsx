/* eslint-disable react/prop-types */
import { FaTrashAlt } from 'react-icons/fa';

const TaskCard = ({ task, i, handleComplete, handleDelete }) => {
    return (
        <>
            <tr>
                <td>{i + 1}</td>
                <td>{task?.name} </td>
                <td>{task?.title}</td>
                <td> {task?.details} </td>
                <td>
                    <button
                        disabled={task.status == 'complete'}
                        onClick={() => handleComplete(task._id)}
                        className="btn btn-warning btn-xs"
                    >
                        {task.status === 'complete' ? 'Completed' : 'Complete!'}
                    </button>
                </td>

                <td>
                    <button
                        onClick={() => handleDelete(task._id)}
                        className="btn btn-error btn-sm"
                    >
                        <FaTrashAlt></FaTrashAlt>
                    </button>
                </td>
            </tr>
        </>
    );
};

export default TaskCard;