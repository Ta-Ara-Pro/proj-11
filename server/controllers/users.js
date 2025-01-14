import User from "../models/User.js"

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user)  {
            return res.status(404).json({ success: false, msg: 'No user found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

export const getUserFriends = async ( req, res ) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all( //making multiple API calls from database
            user.friends.map((id) => User.findById(id))
        );
        const fromattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, locaition, picturePath }) => {
                return { _id, firstName, lastName, occupation, locaition, picturePath }
            }
        );
        res.status(200).json(fromattedFriends)
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message})
    }
}

export const addRemoveFriend = async (req, res) => {
    try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter((id) => id !== friendId);
        friend.friends = friend.friends.filter((id) => id !== id)
    } else {
        user.friends.push(friendId);
        friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all( //making multiple API calls from database
        user.friends.map((id) => User.findById(id))
    );
    const fromattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, locaition, picturePath }) => {
            return { _id, firstName, lastName, occupation, locaition, picturePath }
        }
    );
    res.status(200).json(fromattedFriends)
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message})
    }
}