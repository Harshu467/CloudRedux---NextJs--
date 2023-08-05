const {success} = require('../Helper/Response');
const mongoose = require('mongoose');
const User = require('../Model/User');
const Event = require('../Model/Event');
const VirtualEvent = require('../Model/Event');

exports.createEvent = async (req,res,next) => {
    try{
        const {title,description,date,time,virtualLocation} = req.body;
        const {userId} = req.params;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({error:true,message:"User does not exist"});
        }
        const event = await VirtualEvent.create({
            organizer: new mongoose.Types.ObjectId(userId),
            title,
            description,
            date,
            time,
            virtualLocation,
        });
        return res.status(200).json(success("Event created successfully",event));
    } catch(error){
        res.status(400).json({error:true,message:error.message});
    }

}

exports.getAllVirtualEvents = async (req, res, next) => {
    try {
      const virtualEvents = await VirtualEvent.find();
      return res.status(200).json(success("Here are all virtual events", virtualEvents));
    } catch (error) {
      res.status(400).json({ error: true, message: error.message });
    }
  };

exports.getVirtualEventDetails = async (req, res, next) => {
    try {
      const { eventId } = req.params;
      const virtualEvent = await VirtualEvent.findById(eventId);
  
      if (!virtualEvent) {
        return res.status(400).json({ error: true, message: "Virtual event does not exist" });
      }
  
      return res.status(200).json(success("Virtual event details", virtualEvent));
    } catch (error) {
      res.status(400).json({ error: true, message: error.message });
    }
  };

exports.getUserProfile = async (req, res, next) => {
  try{
    const {userId} = req.params;
    const user = User.findById({id:userId});
    if(!user)
    {
      return res.status(400).json({error:true,message:"User does not exist"});
    }
    const response = {
      id:user.id,
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
    }
    return res.status(200).json(success("User profile",response));
  } catch(error){
    res.status(400).json({error:true,message:error.message});
  }
}

exports.userProfileUpdate = async (req, res, next) => {
  try{
    const {userId} = req.params;
    const {firstName,lastName} = req.body;
    const user = User.findOne({id:userId});
    if(!user)
    {
      return res.status(400).json({error:true,message:"User does not exist"});
    }
    await User.updateOne({id:userId},
      {$set:
        { firstName: firstName?.length !==0 ? firstName : user.firstName,
          lastName: lastName?.length!==0 ?  lastName : user.lastName,
        }});
    return res.status(200).json(success("User profile updated successfully",{id:userId}));
  } catch(error){
    res.status(400).json({error:true,message:error.message});
  }
}

exports.eventsUpdate = async (req, res, next) => {
  try{
    const {userId,eventId} = req.params;
    const {title,description,date,time,virtualLocation} = req.body;
    const user = await User.findById(userId);
    if(!user)
    {
      return res.status(400).json({error:true,message:"User does not exist"});
    }
    if(!title || !description || !date || !time || !virtualLocation)
    {
      return res.status(400).json({error:true,message:"All fields are required"});
    }
    const event = await Event.findById(eventId);
    if(!event)
    {
      return res.status(400).json({error:true,message:"Event does not exist"});
    }
    if (userId !== event.organizer.toString()) {
      return res.status(400).json({ error: true, message: "You are not authorized to update this event" });
    }
    await Event.updateOne({_id:req.params.eventId},
      {
        $set:
        {
          title:title?.length !==0 ? title : event.title,
          description:description?.length !==0 ? description : event.description,
          date:date?.length !==0 ? date : event.date,
          time:time?.length !==0 ? time : event.time,
          virtualLocation:virtualLocation?.length !==0 ? virtualLocation : event.virtualLocation,
        }
      }
    );
    return res.status(200).json(success("Event updated successfully",{_id:eventId}));

  }
  catch(error){
    res.status(400).json({error:true,message:error.message});
  }
}