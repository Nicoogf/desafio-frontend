import mongoose from 'mongoose';
import { TransactionType } from '@/utils/enum';

const {  TRANSFER_SENT, TRANSFER_RECEIVED,  DEPOSIT_COMPLETED,   PAYMENT_SENT , PAYMENT_RECEIVED } = TransactionType
const MovementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    // enum: ['deposit', 'pay', 'receive' ,"transferir"],
    enum: [TRANSFER_SENT, TRANSFER_RECEIVED,  DEPOSIT_COMPLETED,   PAYMENT_SENT , PAYMENT_RECEIVED],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  details: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Movement || mongoose.model('Movement', MovementSchema);