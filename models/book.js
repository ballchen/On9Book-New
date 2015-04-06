exports.book = function(mongoose, autoIncrement) {
    var schema = new mongoose.Schema({
        id: Number,
        name: String,
        createAt: {
            type: Date,
            default: Date.now
        },
        author: String,
        images: []
    });

    schema.plugin(autoIncrement.plugin, {
        model: 'book',
        field: 'id',
    });
    return schema;
};