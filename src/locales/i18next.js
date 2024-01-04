const i18next = require('i18next');

i18next.init({
    resources: {
      en: {
        translation: {
          // Common
          "INTERNAL_SERVER_ERROR": "Internal server error",
          "BAD_REQUEST": "Bad request",
          "RESOURCE_NOT_FOUND": "Resource not found",
          "VALIDATION_ERROR": "Validation error occurred",
          "UNAUTHORIZED": "Unauthorized",
          "FORBIDDEN": "Forbidden",
          "CONFLICT": "Conflict",
          "RESOURCE_CREATED": "Resource created successfully",
          "RESOURCE_UPDATED": "Resource updated successfully",
          "RESOURCE_DELETED": "Resource deleted successfully",
          "RESOURCE_FETCHED": "Resource fetched successfully",
          // Specific entities
          "CURRENCY_NOT_FOUND": "Currency not found",
          "NOTIFICATION_NOT_FOUND": "Notification not found",
          "USER_NOT_FOUND": "User not found",
          "GROUP_NOT_FOUND": "Group not found",
          "EXPENSE_NOT_FOUND": "Expense not found",
          "PHOTO_NOT_FOUND": "Photo not found",
          // Mongoose Errors
          "MONGOOSE_DUPLICATE_KEY_ERROR": "Duplicate key error",
          "MONGOOSE_VALIDATION_ERROR": "Data validation failed",
          "INVALID_ID_FORMAT": "The provided ID format is invalid.",
          // ... other translations
        }
      },
      fr: {
        translation: {
          // Common
          "INTERNAL_SERVER_ERROR": "Erreur interne du serveur",
          "BAD_REQUEST": "Mauvaise requête",
          "RESOURCE_NOT_FOUND": "Ressource non trouvée",
          "VALIDATION_ERROR": "Une erreur de validation s'est produite",
          "UNAUTHORIZED": "Non autorisé",
          "FORBIDDEN": "Interdit",
          "CONFLICT": "Conflit",
          "RESOURCE_CREATED": "Ressource créée avec succès",
          "RESOURCE_UPDATED": "Ressource mise à jour avec succès",
          "RESOURCE_DELETED": "Ressource supprimée avec succès",
          "RESOURCE_FETCHED": "Ressource récupérée avec succès",
          // Specific entities
          "CURRENCY_NOT_FOUND": "Devise non trouvée",
          "NOTIFICATION_NOT_FOUND": "Notification non trouvée",
          "USER_NOT_FOUND": "Utilisateur non trouvé",
          "GROUP_NOT_FOUND": "Groupe non trouvé",
          "EXPENSE_NOT_FOUND": "Dépense non trouvée",
          "PHOTO_NOT_FOUND": "Photo non trouvée",
          // Mongoose Errors
          "MONGOOSE_DUPLICATE_KEY_ERROR": "Erreur de clé dupliquée",
          "MONGOOSE_VALIDATION_ERROR": "Échec de la validation des données",
          "INVALID_ID_FORMAT": "The provided ID format is invalid.",
          // ... other translations
        }
      }
      // ... other languages
    },
    fallbackLng: 'en',
    // ... other i18next options
  });
    
  

module.exports = i18next;
