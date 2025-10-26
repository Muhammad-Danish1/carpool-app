import { Types } from 'mongoose';
import User from '../models/user.model';
import Vehicle from '../models/vehicle.model';
import ApiError from '../utils/api-error';

const getUserProfile = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  
  const vehicles = await Vehicle.find({ owner: userId, isActive: true });
  
  return { user, vehicles };
};

const updateUserProfile = async (userId: Types.ObjectId, updates: any) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, runValidators: true }
  ).select('-password');
  
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  
  return user;
};

const addVehicle = async (userId: Types.ObjectId, vehicleData: any) => {
  const vehicle = await Vehicle.create({
    ...vehicleData,
    owner: userId
  });
  
  return vehicle;
};

const updateVehicle = async (userId: Types.ObjectId, vehicleId: string, updates: any) => {
  const vehicle = await Vehicle.findOne({ _id: vehicleId, owner: userId });
  
  if (!vehicle) {
    throw new ApiError(404, 'Vehicle not found or not owned by user');
  }
  
  Object.assign(vehicle, updates);
  await vehicle.save();
  
  return vehicle;
};

const deleteVehicle = async (userId: Types.ObjectId, vehicleId: string) => {
  const vehicle = await Vehicle.findOne({ _id: vehicleId, owner: userId });
  
  if (!vehicle) {
    throw new ApiError(404, 'Vehicle not found or not owned by user');
  }
  
  vehicle.isActive = false;
  await vehicle.save();
  
  return { message: 'Vehicle deleted successfully' };
};

export default {
  getUserProfile,
  updateUserProfile,
  addVehicle,
  updateVehicle,
  deleteVehicle
};
