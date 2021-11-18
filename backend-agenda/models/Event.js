const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    place: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    startHour: { type: String, required: true },
    endHour: { type: String, required: true },
    recurrence: { type: String, required: true },
    dateRecurrence: { type: String, required: true },
    swoleDay: { type: String, required: true },
});

module.exports = mongoose.model('Event', eventSchema);