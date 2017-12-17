import { Schema, mongo, SchemaTypes, model } from 'mongoose';

let studentSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})
export default model('students', studentSchema)