setwd("C:/Users/perde/OneDrive/Dokumenty/SentryVisualization")
library(stringr)

sentryData1 <- read.csv('./data/cyran-export.csv')
print(colnames(sentryData1))
sentryData <- sentryData1[,c('Error', 'Users', 'Events', 'Location')]
rownames(sentryData) <- sentryData1[['Details']]


sentryData[['Events']] = unlist(lapply(sentryData[['Events']], as.numeric))
sentryData[['Users']] = unlist(lapply(sentryData[['Users']], as.numeric))

hist(unlist(sentryData[['Users']]), main="Unikátni používatelia aplikácie",
     xlab="Počet unikátnych používateľov", ylab="Frekvencia udalostí")

hist(sentryData[['Events']], main="Počet udalostí vytvorených používateľmi",
     xlab="Počet udalosti vytvorených používateľmi", ylab="Frekvencia udalostí")


plot(sentryData[['Users']], sentryData[['Events']], xlab="Počet unikátnych používateľov",
     ylab="Počet udalosti pre report správu", main="Udalosti generované používateľmi")
linearRegression <-lm(Events ~ Users, data = sentryData)
abline(linearRegression, col="red")
print(summary(linearRegression))

error <-table(factor(sentryData[['Error']]))
barplot(error/sum(error)*100,ylab="Počet percent", xlab="Typy správ",
        main="Zastúpenie rôznych typov správ")

sentryData[['Location']] <- unlist(lapply(sentryData[['Location']], function(x)
  str_replace(x, "https?://localhost:4200","")))
location <-table(factor(sentryData[['Location']]))
barplot(location/sum(location)*100,ylab="Počet percent", xlab="Typy správ",
        main="Zastúpenie rôznych lokácií pre správy")

print(sentryData)

qqnorm(sentryData[['Users']], main = "Q-Q plot pre unikátnych používateľov")
qqline(sentryData[['Users']])
print(shapiro.test(as.numeric(sentryData[sample(0:length(sentryData[['Users']]), length(sentryData[['Users']]), replace=FALSE), 'Users'])))
qqnorm(sentryData[['Events']], main = "Q-Q plot pre udalosti")
qqline(sentryData[['Events']])
print(shapiro.test(as.numeric(sentryData[sample(0:length(sentryData[['Events']]), length(sentryData[['Events']]), replace=FALSE), 'Events'])))


countModus <- function(dataFrameColumn) {
  dataFrameColumnWithoutNA <- na.omit(dataFrameColumn)
  uniqueValues <- unique(dataFrameColumnWithoutNA)
  return(uniqueValues[which.max(tabulate(match(dataFrameColumnWithoutNA, uniqueValues)))])
}

countBasicStatisticsOnNormalDistricution <- function(dataFrameColumn){
  print(paste("Mean is: ", mean(dataFrameColumn, na.rm= TRUE)))
  print(paste("Max value is: ", max(dataFrameColumn, na.rm= TRUE )))
  print(paste("Min value is: ", min(dataFrameColumn, na.rm= TRUE)))
  print(paste("Range: ", max(dataFrameColumn, na.rm= TRUE ) - min(dataFrameColumn, na.rm= TRUE)))
  print(paste("Variance is: ", var(dataFrameColumn, na.rm= TRUE)))
  print(paste("Modus is: ", countModus(dataFrameColumn)))
  print(paste("Median is: ", median(dataFrameColumn, na.rm= TRUE)))
}

print("Statistics for Users:")
countBasicStatisticsOnNormalDistricution(sentryData[['Users']])

print("Statistics for Events:")
countBasicStatisticsOnNormalDistricution(sentryData[['Events']])
