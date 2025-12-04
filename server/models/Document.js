module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define('Document', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING, // 'notice', 'minutes', 'report'
            allowNull: false
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uploadDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        description: {
            type: DataTypes.TEXT
        }
    });
    return Document;
};
