//-------------------------------------------------------------------------------
// Licensed Materials - Property of IBM
// (C) Copyright IBM Corp. 2013,2014. All Rights Reserved.
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
//-------------------------------------------------------------------------------

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// INTERNAL IBM CODE - NOT API.  THIS CODE SHOULD BE USED WITH CAUTION AS IT CAN AND WILL CHANGE WITHOUT PUBLIC NOTICE ///////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


#import <Foundation/Foundation.h>

@interface IBMLogger : NSObject

+(void) logError: (NSString *)message;
+(void) logWarning: (NSString*) message;
+(void) logInfo: (NSString *)message;
+(void) logTrace: (NSString*) message;
+(void) logDebug: (NSString*) message;
+(void) log: (NSString*) category withMessage: (NSString*) message;


+(void) logErrorWithFormat: (NSString *)format, ...;
+(void) logWarningWithFormat: (NSString*) format, ...;
+(void) logInfoWithFormat: (NSString *)format, ...;
+(void) logTraceWithFormat: (NSString*) format, ...;
+(void) logDebugWithFormat: (NSString*) format, ...;
+(void) log: (NSString*) category withFormat: (NSString*) format, ...;

+(void) addLogCategory: (NSString*) category;
+(void) addLogCategories: (NSArray*) categories;
+(void) removeLogCategory: (NSString*) category;
+(void) removeLogCategories: (NSArray*) categories;

// Experimental and will change
+(void) logError: (NSError*) error withMessage: (NSString *)message;

@end
